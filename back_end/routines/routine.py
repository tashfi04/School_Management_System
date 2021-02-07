teacher_queue = []
routine = []

def generateRoutine(class_description, teacher_list, max_class_a_day):
    
    generateWeek(class_description, teacher_list, max_class_a_day)
    
    for items in class_description:
        printWeekForClass()
        
        
def generateWeek(class_description, teacher_list, max_class_a_day):
    
    for day in range(5):
        generateTeacherQueue(class_description, teacher_list, max_class_a_day)
        generateForSingleDay(day, class_description, teacher_list, max_class_a_day)
        
        
def generateTeacherQueue(class_description, teacher_list, max_class_a_day):
    
    for indx, classes in enumerate(class_description):
        
        for j, subjects in enumerate (classes.subject_set):
            teacher_queue[index].append(j)
    
    
def generateForSingleDay(day, class_description, teacher_list, max_class_a_day):

    count_class = []
    for gap in max_class_a_day:
        
        for a, _class in enumerate(class_description):
            
            if routine[day][a].size() != _class.total_class_a_day

                availableTeacher = []
                canGenerate = False
                for teacher in teacher_list:
                    
                    i = teacher_queue.pop(0)

                    if (not (availableTeacher[_class.subject_set[i]['teacher_id']])) and (_class.subject_set[i]['total_class_a_week'] > count_class[a][i]):
                        
                        availableTeacher[_class.subject_set[i]['teacher_id']] = True
                        """
                        fix the code below
                        """
                        #_class[i].total_class_a_week -= 1

                        count_class[a][i] += 1
                        
                        routine[day][a].push_back({_class.subject_set[i].id, _class.subject_set[i].teacher_id})
                        
                        teacher_queue[a].appnd(i)
                        canGenerate = True
                        break
                    
                    teacher_queue[a].appnd(i)
                    
                if not canGenerate:
                    print("Can't generate routine!!!")
                    
                    return None
