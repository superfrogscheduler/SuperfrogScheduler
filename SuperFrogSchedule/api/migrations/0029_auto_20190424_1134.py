# Generated by Django 2.1.5 on 2019-04-24 16:34

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_auto_20190424_0948'),
    ]

    operations = [
        migrations.AddField(
            model_name='constant',
            name='cost_per_mile',
            field=models.DecimalField(decimal_places=2, default=0.5, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='constant',
            name='earliest_appearance_time',
            field=models.TimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='constant',
            name='latest_appearance_time',
            field=models.TimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='constant',
            name='max_distance',
            field=models.IntegerField(default=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='constant',
            name='private_hourly_rate',
            field=models.DecimalField(decimal_places=2, default=175.0, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='constant',
            name='public_hourly_rate',
            field=models.DecimalField(decimal_places=2, default=100.0, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='constant',
            name='superfrog_hourly_wage',
            field=models.DecimalField(decimal_places=2, default=25.0, max_digits=10),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='constant',
            name='cheerleader_captain_email',
            field=models.EmailField(max_length=255, verbose_name='Cheerleader Captain Email'),
        ),
    ]