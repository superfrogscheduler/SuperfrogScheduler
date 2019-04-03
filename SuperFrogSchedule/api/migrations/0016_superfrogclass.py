# Generated by Django 2.1.5 on 2019-04-02 18:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_auto_20190317_2210'),
    ]

    operations = [
        migrations.CreateModel(
            name='SuperfrogClass',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('day', models.IntegerField()),
                ('start', models.TimeField()),
                ('end', models.TimeField()),
                ('superfrog', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Superfrog')),
            ],
        ),
    ]