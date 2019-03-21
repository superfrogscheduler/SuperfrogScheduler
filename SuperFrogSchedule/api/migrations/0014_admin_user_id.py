# Generated by Django 2.1.7 on 2019-03-17 21:27

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_admin_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='admin',
            name='user_id',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]
