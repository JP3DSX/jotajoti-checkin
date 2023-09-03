from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class CheckIn (models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    callsign = models.CharField(max_length=10)
    mode = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    memo = models.CharField(max_length=144)
    checkInTime = models.DateTimeField(auto_now_add=True)
    updateTime = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.id) + " - " + self.callsign

#返信副テーブル
class CheckIn_Reply(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    content = models.CharField(max_length=144)
    postdate = models.DateTimeField(auto_now_add=True)
    checkin = models.ForeignKey(CheckIn,on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id) + " - " + self.checkin

#モード副テーブル
class CheckIn_Mode (models.Model):
    checkin = models.ForeignKey(CheckIn,on_delete=models.CASCADE)
    
#モードマスタテーブル
class Mode (models.Model):
    mode = models.CharField(max_length=10)
