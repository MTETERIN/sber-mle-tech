from django.db import models

# Create your models here.


class INN(models.Model):
    hash_inn = models.IntegerField(primary_key=True)
    okved2 = models.IntegerField()
    region = models.IntegerField()
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.hash_inn)


class Pay(models.Model):

    hash_inn_kt = models.ForeignKey('INN', related_name='hash_inn_kt', on_delete=models.CASCADE)
    hash_inn_dt = models.ForeignKey('INN', related_name='hash_inn_dt', on_delete=models.CASCADE)
    week = models.IntegerField()
    count = models.IntegerField()
    sum = models.FloatField(null=True)

    def __str__(self):
        return str(self.hash_inn_kt)