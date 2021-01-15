from rest_framework import serializers
from ..models import MarkSheet

class CreateUpdateListSerializer(serializers.ListSerializer):

    def create(self, validated_data):
        return [self.child.create(item) for item in validated_data]

    def update(self, instances, validated_data):
        instance_hash = {index: instance for index, instance in enumerate(instances)}

        result = [
            self.child.update(instance_hash[index], item)
            for index, item in enumerate(validated_data)
        ]

        return result


class MarkSheetSerializer(serializers.ModelSerializer):

    def create(self, validated_data):

        instance = MarkSheet(**validated_data)

        instance.save()

        return instance

    def update(self, instance, validated_data):

        instance.subjective_marks = validated_data["subjective_marks"]
        instance.objective_marks = validated_data["objective_marks"]
        instance.total_marks = validated_data["total_marks"]
        instance.letter_grade = validated_data["letter_grade"]

        instance.save()

        return instance

    class Meta:

        model = MarkSheet
        fields = '__all__'

        list_serializer_class = CreateUpdateListSerializer
    