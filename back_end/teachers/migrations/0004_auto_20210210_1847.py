# Generated by Django 3.0.7 on 2021-02-10 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0003_auto_20210208_0647'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacher',
            name='role',
            field=models.IntegerField(choices=[(1, 'Teacher'), (3, 'Headmaster')], null=True),
        ),
    ]
