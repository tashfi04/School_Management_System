# Generated by Django 3.0.7 on 2020-09-20 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0006_auto_20200919_0156'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Others')], max_length=1),
        ),
    ]
