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

        count_class = []
        for gap in range(max_class_a_day):
            
            for a, _class in enumerate(class_description):
                
                if len(self.routine[day][a]) != _class.total_class_in_a_day:

                    availableTeacher = []
                    canGenerate = False

                    for teacher in teacher_list:
                        
                        i = self.teacher_queue[a].pop(0)

                        if (not (availableTeacher[_class.subject_set.all()[i]['teacher_id']])) and (_class.subject_set.all()[i]['total_class_a_week'] > count_class[a][i]):
                            
                            availableTeacher[_class.subject_set.all()[i]['teacher_id']] = True
                            """
                            fix the code below
                            """
                            #_class[i].total_class_a_week -= 1

                            count_class[a][i] += 1
                            
                            #self.routine[day][a].push_back({_class.subject_set.all()[i].id, _class.subject_set.all()[i].teacher_id})
							
							
							self.routine_row.related_class_id=_class.subject_set.all([i].id
							self.routine_row.period=gap
							
							if(day==0) self.routine_row.sunday=1
							elif(day==1) self.routine_row.monday=1
							elif(day==2) self.routine_row.tuesday=1
							elif(day==3) self.routine_row.wednesday=1
							elif(day==4) self.routine_row.thursday=1
							
							routine_list.push_back(routine_row)
                            
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
            
        
