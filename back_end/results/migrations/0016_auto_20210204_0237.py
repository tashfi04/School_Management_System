# Generated by Django 3.0.7 on 2021-02-04 02:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('results', '0015_auto_20210204_0226'),
    ]

    operations = [
        migrations.AlterField(
            model_name='marksheet',
            name='class_test_marks',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
        migrations.AlterField(
            model_name='marksheet',
            name='lab_marks',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=5),
        ),
        migrations.AlterField(
            model_name='marksheet',
            name='term_test_objective_marks',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
        migrations.AlterField(
            model_name='marksheet',
            name='term_test_subjective_marks',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
        migrations.AlterField(
            model_name='marksheet',
            name='term_test_total_marks',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=5),
        ),
        migrations.AlterField(
            model_name='marksheet',
            name='total_marks',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=5),
        ),
    ]
