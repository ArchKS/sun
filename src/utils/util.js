export default {
    // 一维数组分割为二位数组，比如[1,2,3,4,5,6] => [[1,2,3],[4,5,6]]
    group(arr,gap){
        let index = 0;
        let res = [];
        while(index < arr.length) {
            res.push(arr.slice(index, index += gap));
        }
        while(res[res.length-1].length < gap){
            res[res.length-1].push({
                title: 'test', 
                link: 'https://ymlog.cn/', 
                created: '2018/04/01', 
                tag: '', 
                category: '', 
                visited: 0, 
                id: 100000,
            });
        }
        return res;
    }
}