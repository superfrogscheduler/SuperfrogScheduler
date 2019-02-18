# Generated by Django 2.1.5 on 2019-01-31 20:55

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_auto_20190131_1450'),
    ]

    operations = [
        migrations.AlterField(
            model_name='superfrog',
            name='appearances',
            field=models.ManyToManyField(through='api.SuperfrogAppearance', to='api.Appearance'),
        ),
        migrations.AlterField(
            model_name='superfrog',
            name='email',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='superfrog',
            name='first_name',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='superfrog',
            name='last_name',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='superfrog',
            name='phone',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='superfrogappearance',
            name='date_assigned',
            field=models.DateTimeField(default=datetime.datetime(2019, 1, 31, 14, 55, 2, 438592)),
        ),
    ]