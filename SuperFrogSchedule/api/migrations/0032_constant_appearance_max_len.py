# Generated by Django 2.1.5 on 2019-04-24 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0031_auto_20190424_1137'),
    ]

    operations = [
        migrations.AddField(
            model_name='constant',
            name='appearance_max_len',
            field=models.IntegerField(default=4),
            preserve_default=False,
        ),
    ]
