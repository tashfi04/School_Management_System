#include<bits/stdc++.h>
using namespace std;

const int totalClass=5;

struct data{
    string subject_name,teacher_name;
    int total_class;
    data(string subject_name,string teacher_name,int total_class):subject_name(subject_name),teacher_name(teacher_name),total_class(total_class){}
};


int number_of_teacher,number_of_class;
vector<string>teacher_id;
vector<data>information[15];
vector<data>firstClassinformation[15];
queue<int>teacherQueue[15];

map<string,bool> availableTeacher;

vector<pair<string,string>>routine[10][15];

int total_class_a_day[15];


void generateTeacherQueue()
{
    for(int i=0;i<number_of_class;i++){
        while(!teacherQueue[i].empty()){
            teacherQueue[i].pop();
        }
        for(int j=0;j<information[i].size();j++){
            teacherQueue[i].push(j);
        }
    }
}


void generateForSingleDay(int day)
{
    //first class
    for(int _class=0;_class<number_of_class;_class++){
        for(int i=0;i<firstClassinformation[_class].size();i++){
            if(firstClassinformation[_class][i].total_class>0){
                firstClassinformation[_class][i].total_class--;
                routine[day][_class].push_back({firstClassinformation[_class][i].subject_name,firstClassinformation[_class][i].teacher_name});
                break;
            }
        }
    }
    
    //from 2nd class
    for(int gap=1;gap<totalClass;gap++){
        for(int _class=0;_class<number_of_class;_class++){
            if(routine[day][_class].size()==total_class_a_day[_class]) continue;
            availableTeacher.clear();
            int allocated=0;
            for(allocated=0;allocated<number_of_teacher;allocated++){
                int i=teacherQueue[_class].front();
                teacherQueue[_class].pop();
                if(availableTeacher[information[_class][i].teacher_name]==false && information[_class][i].total_class>0){
                    availableTeacher[information[_class][i].teacher_name]=true;
                    information[_class][i].total_class--;
                    routine[day][_class].push_back({information[_class][i].subject_name,information[_class][i].teacher_name});
                    teacherQueue[_class].push(i);
                    break;
                }
                teacherQueue[_class].push(i);
            }
            if(allocated==number_of_teacher){
                cout<<"Cant generate\n";
                return;
            }
        }
    }
}


void generateWeek()
{
    for(int day=0;day<7;day++){
        generateTeacherQueue();
        generateForSingleDay(day);
    }
}



void printWeekForClass(int _class)
{
    for(int day=0;day<7;day++){
        for(int j=0;j<totalClass;j++){
            cout<<routine[day][_class][j].first<<"("<<routine[day][_class][j].second<<")\t";
        }
        cout<<endl;
    }
}


int main()
{
    cin>>number_of_teacher;
    for(int i=0;i<number_of_teacher;i++){
        string id; cin>>id;
        teacher_id.push_back(id);
    }

    cin>>number_of_class;
    for(int i=0;i<number_of_class;i++){
        int number_of_subject;
        cin>>number_of_subject;
        cin>>total_class_a_day[i]
        int cnt=7;
        for(int j=0;j<number_of_subject;j++){
            string subject_name,teacher_name;
            int total_class;
            cin>>subject_name>>teacher_name>>total_class;
            if(cnt){
                firstClassinformation[i].push_back(data(subject_name,teacher_name,total_class));
                cnt-=total_class;
            }else{
                information[i].push_back(data(subject_name,teacher_name,total_class));
            }

        }
    }
    generateWeek();
    for(int i=0;i<number_of_class;i++){
        printWeekForClass(i);
        cout<<"------------------------\n";
    }
}
