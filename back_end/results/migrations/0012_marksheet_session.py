# Generated by Django 3.0.7 on 2021-02-04 01:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sessions', '0001_initial'),
        ('results', '0011_marksheet_lab_marks'),
    ]

    operations = [
        migrations.AddField(
            model_name='marksheet',
            name='session',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='sessions.Session'),
        ),
    ]
