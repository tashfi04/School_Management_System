# Generated by Django 3.0.7 on 2020-09-20 02:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0023_auto_20200920_0207'),
    ]

    operations = [
        migrations.AlterField(
            model_name='class',
            name='group',
            field=models.CharField(choices=[('Sci', 'Science'), ('Hum', 'Humanities'), ('Bus', 'Business Studies')], max_length=30, null=True),
        ),
    ]
