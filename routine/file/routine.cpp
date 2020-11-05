#include<bits/stdc++.h>
using namespace std;

struct data{
    string subject_name,teacher_name;
    int total_class;
    data(string subject_name,string teacher_name,int total_class):subject_name(subject_name),teacher_name(teacher_name),total_class(total_class){}
};


int number_of_teacher,number_of_class;
vector<string>teacher_id;
vector<data>information[15];



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
        for(int j=0;j<number_of_subject;j++){
            string subject_name,teacher_name;
            int total_class;
            cin>>subject_name>>teacher_name>>total_class;
            information[i].push_back(data(subject_name,teacher_name,total_class));
        }
    }
}
