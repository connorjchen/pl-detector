class Solution {
    public boolean validateStackSequences(int[] pushed, int[] popped) {
        
        int N = pushed.length;
        Stack<Integer> stack = new Stack();
        
        int j = 0;
        for (int x: pushed) {
            stack.push(x);
            while (!stack.isEmpty() && j < N && stack.peek() == popped[j]) {
                //��ͷԪ�س��ӣ�ջ��Ԫ�س�ջ
                stack.pop();
                j++;
            }
        }
        if (!stack.isEmpty()){
            return false;
        }
        return true;
    }
}