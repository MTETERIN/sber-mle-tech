from .models import INN, Pay
from django.db.models import Q
from django.conf import settings

import pandas as pd
from .entities import FeatureGenerator
from catboost import CatBoostClassifier, Pool


def okved_predict(inn):
    # suffixes = ['_se', '_re']
    # inn_df = pd.DataFrame(list(INN.objects.all().values()))
    # pays = pd.DataFrame(list(Pay.objects.all().values()))
    # merged_pays = pd.merge(pays, inn_df, how='inner', left_on='hash_inn_kt_id', right_on='hash_inn')
    # merged_pays = pd.merge(
    #     merged_pays, inn_df, how='inner',
    #     left_on='hash_inn_dt_id', right_on='hash_inn',
    #     suffixes=suffixes
    # )
    # merged_pays.drop(columns=['hash_inn_kt_id', 'hash_inn_dt_id'], inplace=True)
    # suffixes = [suffix[1:] for suffix in suffixes]
    # fg = FeatureGenerator(n_jobs=4, df=merged_pays, suffixes=suffixes, key_param='hash_inn')
    # features = fg.generate(pays, 'kt_id', 'dt_id')
    # features.region = features.region.astype(int)
    FEATURE_PATH = getattr(settings, "FEATURE_PATH", None)
    features = pd.read_csv(FEATURE_PATH)
    features.region = features.region.astype(int)
    features = features[features['Unnamed: 0'] == int(inn)]
    features.drop(columns=['Unnamed: 0'], inplace=True)
    MODEL_PATH = getattr(settings, "MODEL_PATH", None)
    features = features.drop(columns=['okved'])
    X = Pool(features, cat_features=['region'])
    model = CatBoostClassifier()
    model.load_model(MODEL_PATH)
    y_pred = model.predict(X)
    submission = y_pred[0][0]

    return {'okved2': submission}
