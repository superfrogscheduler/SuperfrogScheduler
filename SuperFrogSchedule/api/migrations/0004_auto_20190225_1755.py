# Generated by Django 2.1.5 on 2019-02-25 23:55

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20190225_1754'),
    ]

    operations = [
        migrations.AlterField(
            model_name='superfrogappearance',
            name='date_assigned',
            field=models.DateTimeField(default=datetime.datetime(2019, 2, 25, 17, 55, 3, 432219)),
        ),
    ]
