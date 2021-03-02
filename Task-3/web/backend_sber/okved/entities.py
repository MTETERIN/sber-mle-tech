from collections import defaultdict

from joblib import delayed, Parallel
import pandas as pd


class FeatureGenerator(object):
    def __init__(self, n_jobs=1, df=None, suffixes=None, key_param=None):
        self.n_jobs = n_jobs
        self.df = df
        self.suffixes = suffixes
        self.key_param = key_param

    def read_chunks(self):
        for suffix in self.suffixes:
            column = f'{self.key_param}_{suffix}'
            for id, user_sample in self.df.groupby(column, sort=False):
                yield id, user_sample, column

    def get_features(self, row):
        return self.features(row)

    def find_most_popular_column(self, row, pays, filtered_suffix, search_suffix):
        inn = row.name
        filtered_column_name = f'{self.key_param}_{filtered_suffix}'
        search_column_name = f'{self.key_param}_{search_suffix}'
        filtered_pays = pays[pays[filtered_column_name] == inn]
        if len(filtered_pays) > 0:
            return filtered_pays[search_column_name].value_counts().idxmax()
        return -1

    def features(self, inn: int, inn_sample, column: str):
        feature_dict = defaultdict(dict)
        prefix = column.split('_')[-1]
        feature_dict[inn]['okved'] = inn_sample[f'okved2'].iloc[0]
        number_of_records = inn_sample.shape[0]
        positive_sum_sample = inn_sample[inn_sample['sum'] >= 0]
        negative_sum_sample = inn_sample[inn_sample['sum'] < 0]
        same_region = inn_sample[inn_sample[f'region_{self.suffixes[0]}'] == inn_sample[f'region_{self.suffixes[1]}']]
        feature_dict[inn][f'region'] = inn_sample[f'region_{prefix}'].iloc[0]
        feature_dict[inn][f'{prefix}_positive_sum_percent'] = (positive_sum_sample.shape[0] / number_of_records) * 100
        feature_dict[inn][f'{prefix}_positive_sum'] = positive_sum_sample['sum'].sum()
        feature_dict[inn][f'{prefix}_negative_sum_percent'] = (negative_sum_sample.shape[0] / number_of_records) * 100
        feature_dict[inn][f'{prefix}_negative_sum'] = inn_sample[inn_sample['sum'] < 0]['sum'].sum()
        feature_dict[inn][f"{prefix}_sales_is_same_region"] = (same_region.shape[0] / inn_sample.shape[0]) * 100
        feature_dict[inn][f"{prefix}_sales_is_not_same_region"] = 100.00 - feature_dict[inn][f"{prefix}_sales_is_same_region"]
        feature_dict[inn][f"{prefix}_accum_sum"] = inn_sample['sum'].sum()
        feature_dict[inn][f"{prefix}_sum_min"] = inn_sample['sum'].min()
        feature_dict[inn][f"{prefix}_sum_max"] = inn_sample['sum'].max()
        feature_dict[inn][f"{prefix}_sum_mean"] = inn_sample['sum'].mean()
        feature_dict[inn][f"{prefix}_sum_25_percentile"] = inn_sample['sum'].quantile(0.25)
        feature_dict[inn][f"{prefix}_sum_std"] = inn_sample['sum'].std()
        feature_dict[inn][f"{prefix}_sum_75_percentile"] = inn_sample['sum'].quantile(0.75)
        feature_dict[inn][f'{prefix}_count_sum'] = inn_sample['count'].sum()
        feature_dict[inn][f'{prefix}_count_mean'] = inn_sample['count'].mean()
        feature_dict[inn][f'{prefix}_count_min'] = inn_sample['count'].min()
        feature_dict[inn][f'{prefix}_count_max'] = inn_sample['count'].max()
        feature_dict[inn][f'{prefix}_sum_across_week_mean'] = feature_dict[inn][f"{prefix}_sum_mean"] / feature_dict[inn][
            f'{prefix}_count_sum']
        feature_dict[inn][f'{prefix}_week_count'] = inn_sample['week'].nunique()
        if prefix == self.suffixes[0]:
            feature_dict[inn][f'{prefix}_number_of_clients'] = inn_sample[f'hash_inn_{self.suffixes[1]}'].nunique()
            feature_dict[inn][f'{prefix}_number_of_regions'] = inn_sample[f'region_{self.suffixes[1]}'].nunique()
        else:
            feature_dict[inn][f'{prefix}_number_of_clients'] = inn_sample[f'hash_inn_{self.suffixes[0]}'].nunique()
            feature_dict[inn][f'{prefix}_number_of_regions'] = inn_sample[f'region_{self.suffixes[0]}'].nunique()
        feature_dict[inn][f'{prefix}_week_count'] = inn_sample['week'].nunique()
        feature_dict[inn][f"{prefix}_records_count"] = number_of_records
        self.postprocessing(feature_dict[inn])
        return feature_dict

    def postprocessing(self, features: dict):
        for column, value in features.items():
            if isinstance(value, float):
                features[column] = round(value, 2)

    def generate(self, pays, prefix_1, prefix_2):
        feature_list = defaultdict(dict)
        results = Parallel(n_jobs=self.n_jobs, backend='loky')(delayed(self.features)(inn, inn_sample, column)
                                                               for inn, inn_sample, column in self.read_chunks())
        for result in results:
            for inn, features in result.items():
                feature_list[inn].update(features)
        feature_df = pd.DataFrame(feature_list).T
        feature_df = feature_df.fillna(0)
        feature_df[f'{self.suffixes[0]}_most_popular_client'] = feature_df.apply(
            lambda row: self.find_most_popular_column(row, pays, prefix_1, prefix_2), axis=1)
        feature_df[f'{self.suffixes[1]}_most_popular_client'] = feature_df.apply(
            lambda row: self.find_most_popular_column(row, pays, prefix_2, prefix_1 ), axis=1)
        return feature_df
