# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-10-12 12:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('dumpsters', '0011_auto_20161012_1229'),
    ]

    operations = [
        migrations.AddField(
            model_name='dumpster',
            name='import_date',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='dumpster',
            name='type',
            field=models.CharField(
                choices=[('edible', 'Food'), ('non-edible', 'Non-edible'), ('both', 'Food & Other stuff'),
                         ('unknown', 'Unknown')], default='unknown', max_length=100),
        ),
    ]
