# Generated by Django 2.1.3 on 2018-11-28 20:04

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_admin_customer_superfrog'),
    ]

    operations = [
        migrations.CreateModel(
            name='SuperfrogAppearance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_assigned', models.DateTimeField(default=datetime.datetime(2018, 11, 28, 14, 4, 54, 129107))),
                ('appearance', models.ForeignKey(on_delete='CASCADE', to='api.Appearance')),
            ],
        ),
        migrations.RemoveField(
            model_name='superfrog',
            name='appearances',
        ),
        migrations.AddField(
            model_name='superfrog',
            name='appearances',
            field=models.ManyToManyField(through='api.SuperfrogAppearance', to='api.Appearance'),
        ),
        migrations.AddField(
            model_name='superfrogappearance',
            name='superfrog',
            field=models.ForeignKey(on_delete='NULL', to='api.Superfrog'),
        ),
    ]