# postmsg
H5 postMessage封装

### 使用
``` 
import Postmsg from 'kb_postmsg';

// 初始化Postmsg
const posmsg = new Postmsg();

// 添加目标窗口
posmsg.addTarget('authIframe', document.getElementById('authIframe').contentWindow); // 添加iframe窗口
posmsg.addTarget('parent', parent); // 添加父窗口

// 监听消息
posmsg.addHandleMessage((e) => {
  console.log(e.data);
});

// 向iframe发送消息
posmsg.send('authIframe', data);

// 向父窗口发送消息
posmsg.send('parent', data);
```

```
### 子窗口向父窗口发消息
import Postmsg from 'kb_postmsg';
posmsg.addTarget('parent', parent); // 添加父窗口
posmsg.send('parent', data);

// data数据格式：
{
   type: 'setHeight',
   value: number, // 高度
}
```
