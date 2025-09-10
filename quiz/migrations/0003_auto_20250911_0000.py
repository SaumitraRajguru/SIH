# Generated manually to avoid interactive prompts

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='question',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='answer',
            name='choice',
            field=models.CharField(choices=[('strongly_dislike', 'Strongly Dislike'), ('dislike', 'Dislike'), ('neutral', 'Neutral'), ('like', 'Like'), ('strongly_like', 'Strongly Like')], max_length=20),
        ),
        migrations.AlterModelOptions(
            name='answer',
            options={'ordering': ['-created_at']},
        ),
        migrations.AlterModelOptions(
            name='question',
            options={'ordering': ['category', 'id']},
        ),
        migrations.AlterUniqueTogether(
            name='answer',
            unique_together={('question', 'user')},
        ),
    ]
