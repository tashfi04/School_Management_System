# Generated by Django 3.0.7 on 2021-02-04 01:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sessions', '0001_initial'),
        ('institution', '0004_auto_20210112_0225'),
    ]

    operations = [
        migrations.AddField(
            model_name='institution',
            name='current_session',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sessions.Session'),
        ),
    ]
