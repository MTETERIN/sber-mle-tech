from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import views
from .models import INN, Pay
from .serializers import INNSerializer, PaySerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'inn': reverse('inn', request=request, format=format),
        'pays': reverse('pays', request=request, format=format),
        'predict': reverse('predict', request=request, format=format),
    })


class INNView(views.APIView):
    DEFAULT_PAGE_SIZE = 20

    def get(self, request, format=None):
        inn = request.GET.get('inn')
        limit = int( request.GET.get('limit')) if request.GET.get('limit') is not None else self.DEFAULT_PAGE_SIZE
        if inn is not None:
            inn = INN.objects.filter(hash_inn__contains=inn)[:limit]
        else:
            inn = INN.objects.all()[:limit]
        serializer = INNSerializer(inn, many=True)
        return Response(serializer.data)


class PayView(views.APIView):
    DEFAULT_PAGE_SIZE = 20

    def get(self, request, format=None):
        inn_sender = request.GET.get('inns')
        inn_receiver = request.GET.get('innr')
        limit = int(request.GET.get('limit')) if request.GET.get('limit') is not None else self.DEFAULT_PAGE_SIZE
        pays = Pay.objects.all()
        if inn_sender:
            pays = pays.filter(hash_inn_kt=inn_sender)
        if inn_receiver:
            pays = pays.filter(hash_inn_dt=inn_receiver)
        pays = pays[:limit]
        serializer = PaySerializer(pays, many=True)
        return Response(serializer.data)


class OkvedPredictView(views.APIView):

    def get(self, request):
        pass