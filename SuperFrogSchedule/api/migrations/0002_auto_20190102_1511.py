# Generated by Django 2.1.3 on 2019-01-02 21:11

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='superfrogappearance',
            name='date_assigned',
            field=models.DateTimeField(default=datetime.datetime(2019, 1, 2, 15, 11, 17, 173041)),
        ),
    ]