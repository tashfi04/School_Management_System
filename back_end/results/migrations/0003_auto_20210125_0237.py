# Generated by Django 3.0.7 on 2021-01-25 02:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('results', '0002_auto_20210112_1138'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='marksheet',
            name='objective_marks',
        ),
        migrations.RemoveField(
            model_name='marksheet',
            name='subjective_marks',
        ),
        migrations.RemoveField(
            model_name='tabulationsheet',
            name='CGPA',
        ),
        migrations.AddField(
            model_name='marksheet',
            name='GP',
            field=models.DecimalField(decimal_places=2, max_digits=3, null=True),
        ),
        migrations.AddField(
            model_name='marksheet',
            name='class_test_marks',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='marksheet',
            name='term_test_objective_marks',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='marksheet',
            name='term_test_subjective_marks',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='marksheet',
            name='term_test_total_marks',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='tabulationsheet',
            name='GPA',
            field=models.DecimalField(decimal_places=2, max_digits=3, null=True),
        ),
        migrations.AddField(
            model_name='tabulationsheet',
            name='current_CGPA',
            field=models.DecimalField(decimal_places=2, max_digits=3, null=True),
        ),
        migrations.AddField(
            model_name='tabulationsheet',
            name='previous_CGPA',
            field=models.DecimalField(decimal_places=2, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='marksheet',
            name='total_marks',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='tabulationsheet',
            name='total_GP',
            field=models.DecimalField(decimal_places=2, max_digits=3, null=True),
        ),
    ]
