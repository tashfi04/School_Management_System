class RoutineGenerator():

    routine_list = []
    count_class = []
    can_generate_routine = True
    routine_generate_fail_output = {
        'class': None,
        'gap': None
    }

    def generateForSingleDay(self, day, class_description, max_class_a_day):

        count_class_in_a_day = [0 for i in range(40)]
        done_class = [[0 for i in range(40)] for j in range(40)]

        for gap in range(max_class_a_day):
            
            availableTeacher = {}
            availableTeacher.clear()
            for a, _class in enumerate(class_description):

                subject_list = _class.subject_set.all().order_by('-total_class_in_a_week')
                
                if count_class_in_a_day[a] != _class.total_class_in_a_day:

                    # availableTeacher = {}

                    canGenerate = False
                    # print("00000000000000000000")

                    for i in range(len(subject_list)):
                        
                        # print('<>--<>--<>')
                        # print(availableTeacher.get(subject_list[i].teacher_id, None))
                        # print(subject_list[i].total_class_in_a_week, self.count_class[a][i], _class.id, subject_list[i].name)
                        # print(done_class[a][i])
                        #print(self.count_class)
                        if done_class[a][i] == 1:
                            continue    

                        if (not (availableTeacher.get(subject_list[i].teacher_id, False)) and (subject_list[i].total_class_in_a_week > self.count_class[a][i])):
                            availableTeacher[subject_list[i].teacher_id] = True
                            self.count_class[a][i] += 1
                            # print(a, i)
                            #print(self.count_class)
                            count_class_in_a_day[a] += 1
                            done_class[a][i] = 1
                            routine_row = {
                                'related_class_id': None,
                                'period': None,
                                'saturday': None,
                                'sunday': None,
                                'monday': None,
                                'tuesday': None,
                                'wednesday': None,
                                'thursday': None
                            }
                            if day == 0:
                                routine_row['related_class_id'] = _class.id
                                routine_row['period'] = gap + 1
                                routine_row['saturday'] = subject_list[i]
                                self.routine_list.append(routine_row)
                            else:
                                p = next((j for j, item in enumerate(self.routine_list) if item['related_class_id'] == _class.id and item['period'] == gap + 1), None)

                                if day == 1:
                                    self.routine_list[p]['sunday'] = subject_list[i]
                                elif day == 2:
                                    self.routine_list[p]['monday'] = subject_list[i]
                                elif day == 3:
                                    self.routine_list[p]['tuesday'] = subject_list[i]
                                elif day == 4:
                                    self.routine_list[p]['wednesday'] = subject_list[i]
                                elif day == 5:
                                    self.routine_list[p]['thursday'] = subject_list[i]

                            canGenerate = True
                            break

                    if not canGenerate:
                        print(a, gap)
                        self.can_generate_routine = False
                        self.routine_generate_fail_output['class'] = _class.name
                        self.routine_generate_fail_output['period'] = gap + 1
                        return None

    def generateWeek(self, class_description, max_class_a_day):
        
        for day in range(6):
            self.generateForSingleDay(day, class_description, max_class_a_day)
            if not self.can_generate_routine:
                break

    def generateRoutine(self, class_description, max_class_a_day):
        
        self.routine_list.clear()
        self.count_class.clear()
        
        self.count_class = [[0 for i in range(40)] for j in range(40)]
        self.can_generate_routine = True

        self.generateWeek(class_description, max_class_a_day)
            