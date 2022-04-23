//
// Created by luozhen on 2018/5/4.
//

#ifndef CODEFORCES_LIB_H
#define CODEFORCES_LIB_H

#endif //CODEFORCES_LIB_H

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};


ListNode* createList(int* a, int n){
    ListNode* list = new ListNode(0), *res = list;
    for(int i=0; i<n; i++){
        res->next = new ListNode(0);
        res->next->val = a[i];
        //cout << res->next->val << " ";
        res = res->next;
    }
    return list->next;
}

void showList(ListNode* ls){
    cout << "show list:" << endl;
    ListNode* p = ls;
    while(p){
        cout << p->val << " ";
        p = p->next;
    }
    cout << endl;
}

