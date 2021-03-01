from django.urls import path
from . import views


urlpatterns = [
    path('', views.api_root),
    path('v1/inn', views.INNView.as_view(), name='inn'),
    path('v1/pays', views.PayView.as_view(), name='pays'),
    path('v1/predict', views.OkvedPredictView.as_view(), name='predict'),
    # path('views', )
]

