class RoutineGenerator():

    teacher_queue = [[0, 0], [0, 0]]

    routine_list = []

    routine_row = {
        'related_class_id': None,
        'period': None,
        'sunday': None,
        'monday': None,
        'tuesday': None,
        'wednesday': None,
        'thursday': None
    }


    def generateForSingleDay(self, day, class_description, teacher_list, max_class_a_day):

        count_class = [[0] * 40] * 10000
        count_class_in_a_day = [0] * 10000

        for gap in range(max_class_a_day):
            
            for a, _class in enumerate(class_description):
                
                if count_class_in_a_day[a] != _class.total_class_in_a_day:

                    availableTeacher = [0] * 10000
                    canGenerate = False

                    for teacher in teacher_list:
                        
                        i = self.teacher_queue[a].pop(0)

                        print(">>>>>>>>>>>>>>>>>_______________<<<<<<<<<<<<<<<<<<<<<")
                        print(_class.id, _class.subject_set)
                        print(_class.subject_set.all()[i]['teacher_id'])
                        if (not (availableTeacher[_class.subject_set.all()[i]['teacher_id']])) and (_class.subject_set.all()[i]['total_class_a_week'] > count_class[a][i]):
                            
                            availableTeacher[_class.subject_set.all()[i]['teacher_id']] = True
                            """
                            fix the code below
                            """

                            count_class[a][i] += 1
                            count_class_in_a_day[a] += 1

						    #if (day == 0):
                            if day == 0:
                                self.routine_row['related_class_id'] = _class.id
                                self.routine_row['period'] = gap
                                self.routine_row['sunday'] = _class.subject_set.all()[i].id
                                self.routine_list.append(self.routine_row)
                            else:
                                next((j for j, item in enumerate(self.routine_list) if item['related_class_id'] == _class.id and item['period'] == gap), None)
                                print(">>>>>>>>>>_______________<<<<<<<<<<<<<<<<<<<<<")
                                print(j)

                                if day == 1:
                                    self.routine_list[j]['monday'] = _class.subject_set.all()[i].id
                                elif day == 2:
                                    self.routine_list[j]['tuesday'] = _class.subject_set.all()[i].id
                                elif day == 3:
                                    self.routine_list[j]['wednesday'] = _class.subject_set.all()[i].id
                                elif day == 4:
                                    self.routine_list[j]['thursday'] = _class.subject_set.all()[i].id

                            self.teacher_queue[a].appnd(i)
                            canGenerate = True
                            break
                        
                        self.teacher_queue[a].appnd(i)
                        
                    if not canGenerate:
                        print("Can't generate routine!!!")
                        
                        return None


    def generateTeacherQueue(self, class_description, teacher_list, max_class_a_day):
        
        for index, classes in enumerate(class_description):
            
            for j, subjects in enumerate (classes.subject_set.all()):
                self.teacher_queue[index].append(j)

    def generateWeek(self, class_description, teacher_list, max_class_a_day):
        
        for day in range(5):
            self.generateTeacherQueue(class_description, teacher_list, max_class_a_day)
            self.generateForSingleDay(day, class_description, teacher_list, max_class_a_day)

    def generateRoutine(self, class_description, teacher_list, max_class_a_day):
        
        self.generateWeek(class_description, teacher_list, max_class_a_day)
            
        
