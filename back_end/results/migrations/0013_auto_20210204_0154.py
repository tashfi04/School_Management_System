# Generated by Django 3.0.7 on 2021-02-04 01:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('academic_sessions', '0001_initial'),
        ('results', '0012_marksheet_session'),
    ]

    operations = [
        migrations.AlterField(
            model_name='marksheet',
            name='session',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='academic_sessions.Session'),
        ),
    ]
