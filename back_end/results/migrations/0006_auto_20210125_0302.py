# Generated by Django 3.0.7 on 2021-01-25 03:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('results', '0005_auto_20210125_0300'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tabulationsheet',
            name='total_GP',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=3),
        ),
    ]
