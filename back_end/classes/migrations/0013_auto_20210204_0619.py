# Generated by Django 3.0.7 on 2021-02-04 06:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0012_remove_exam_exam_year'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='exam',
            options={'ordering': ['subject']},
        ),
    ]
