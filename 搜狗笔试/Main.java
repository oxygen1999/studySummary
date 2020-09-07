import java.util.*;

/**
 * 	1. 使用hashmap构建树形结构
 * 	2. 递归分治法：假设已知 各个子节点的分发时间：
 *     	则： 2.1 对子节点的分发时间进行降序排列
 *     	    2.2 当前节点优先对 子节点分发时间 较长的节点进行分发, 
 * 				如:子节点分发时间 4 2 1 1 1 0, k=2, 则: 先后分发顺序(42)(11)(10),也就是
 *                     (42)+1 (11)+2 (10)+3 => 5 3 3 3 4 3 => 分三轮分发, 最终所需时间为 5 h。
 *             2.3 当节点为叶子结点, 分发时间为0
 *             2.4 最后使用分治法进行递归分发,相当于从叶子节点向上推。
 */
class Node{

    int id = 0;
    List<Node> sons = new ArrayList<>();
    Node parent = null;
}

public class Main {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        HashMap<Integer , Node> hashMap = new HashMap<>();

        int K = sc.nextInt();
        int N = sc.nextInt();

        if(K == 0 || N == 0){
            System.out.println(0);
        }

        sc.nextLine();

        //树形构建
        for(int i = 0;i < N;i++){
            int node_n = sc.nextInt();
            //指定父节点
            int parent_id = sc.nextInt();
            Node my = null;
            if(hashMap.containsKey(parent_id)){
                //父节点存在
                my = hashMap.get(parent_id);
            }else{
                //父节点不存在
                my = new Node();
                my.id = parent_id;
                hashMap.put(parent_id,my);
            }
            //儿子节点
            for(int j = 0;j < node_n - 1;j++){
                int son_id = sc.nextInt();
                if(hashMap.containsKey(son_id)){
                    //儿子节点存在
                    hashMap.get(parent_id).sons.add(hashMap.get(son_id));
                }else{
                    //儿子节点不存在
                    Node son = new Node();
                    son.id = son_id;
                    son.parent = my;
                    hashMap.put(son.id,son);
                    hashMap.get(parent_id).sons.add(son);
                }
            }
            sc.nextLine();
        }

        //根节点存在
        Node root = hashMap.get(0);
        //分治法
        System.out.println(FZ(root , K));

    }

    public static int FZ(Node node , int k){
        int max = 0;
        if(node.sons.size() == 0){
            return 0;
        }else{
            Integer[] sons_time = new Integer[node.sons.size()];
            int i = 0;
            //统计分支时间
            for(Node son:node.sons){
                sons_time[i++] = FZ(son , k);
            }
            //合并分支与当前时间
            //降序排序
            Arrays.sort(sons_time, new Comparator<Integer>() {
                @Override
                public int compare(Integer o1, Integer o2) {
                    return o2 - o1;
                }
            });
            //计算当前节点为root所需要的时间
            int add = 1;
            for(int j = 0; j < sons_time.length ; j++){
                if(j!=0 && (j%k) == 0){
                    add++;
                }
                sons_time[j] += add;
                if(sons_time[j] > max){
                    max = sons_time[j];
                }
            }
        }
        return max;
    }
}