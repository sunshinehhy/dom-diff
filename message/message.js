/**
 * 课程讲师
 */

const LeaveMessageList = () => import('@views/message/leave-message-list.vue');
const LeaveMessageCheck = () => import('@views/message/leave-message-check.vue');
const Course = () => import('@views/course/index');

export default {
  path: 'message', //不能加斜杠
  name: '课程',
  component: Course,  //这个必须要，为什么呢？
  children: [
    {
      path: 'leave-message-list',
      name: '留言列表',
      component: LeaveMessageList
    },
    {
      path: 'leave-message-check',
      name: '查看留言',
      component: LeaveMessageCheck,
      meta: {
        origin: '留言列表'
      }
    }
  ]
}
