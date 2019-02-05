# Generated by Django 2.1.5 on 2019-01-30 20:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20190130_1356'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='email',
            field=models.CharField(default=None, max_length=200),
        ),
        migrations.AlterField(
            model_name='customer',
            name='first_name',
            field=models.CharField(default=None, max_length=30),
        ),
        migrations.AlterField(
            model_name='customer',
            name='last_name',
            field=models.CharField(default=None, max_length=30),
        ),
        migrations.AlterField(
            model_name='customer',
            name='phone',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='superfrogappearance',
            name='date_assigned',
            field=models.DateTimeField(default=datetime.datetime(2019, 1, 30, 14, 1, 35, 781088)),
        ),
    ]
