# Generated by Django 3.0.7 on 2021-02-04 02:11

from django.db import migrations, models
import django.db.models.deletion
import results.models


class Migration(migrations.Migration):

    dependencies = [
        ('academic_sessions', '0001_initial'),
        ('results', '0013_auto_20210204_0154'),
    ]

    operations = [
        migrations.AlterField(
            model_name='marksheet',
            name='session',
            field=models.ForeignKey(blank=True, default=results.models.get_current_session, on_delete=django.db.models.deletion.CASCADE, to='academic_sessions.Session'),
        ),
    ]