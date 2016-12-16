<template>
<div class="setting">
    <label @click="editPrice">价格 {{price}} <info>价格：包邮！</info> <i class="sm-edit"></i></label>
    <label @click="editRegion">地域 {{region}}
        <info>地域：你选择了<div>{{region}}</div></info>
        <i class="sm-edit"></i>
    </label>
    <label @click="editPeriod">时段 {{period}}<i class="sm-edit"></i></label>
    <label @click="editIp">限制IP {{ip.length}}<i class="sm-edit"></i></label>
</div>
</template>

<script type="text/javascript">

import smui from 'smui'
import Dialog from 'smui/Dialog'
// import Schedule from 'smui/Schedule.vue'
// import LineBox from 'smui/LineBox.vue'

export default {
    components: smui,
    data() {
        return {
            price: 0,
            region: 0,
            period: '',
            ip: []
        }
    },
    methods: {
        editPrice() {
            // 简单地数字文本输入可以直接用Prompt函数
            Dialog.prompt(
                {
                    title: '修改价格',
                    type: 'number'
                },
                (value) => {
                    this.price = value
                }
            );
        },
        editRegion() {
            let dialog = new Dialog({
                content: ''
            })
            dialog.showModal()
            dialog.$on('ensure', () => {
                // 确认修改
            })
        },
        editPeriod() {
            let dialog = new Dialog({
                content: Schedule
            })

            dialog.showModal({
                title: '修改投放时段'
            })
            dialog.$on('ensure', (e) => {
                Dialog.alert('修改成功')
            })
        },
        editIp() {
            let dialog = new Dialog({
                data: {
                    title: '修改IP排除'
                },
                content: LineBox
            })
            dialog.showModal()
            dialog.$on('ensure', (e) => {
                Dialog.alert('修改成功')
            })
        }
    }
}
</script>

<style type="text/css" lang="less">
.setting {
    padding: 8px 15px 7px 15px;
    padding-right: 100px;
    position: relative;
    font-size: 12px;
    line-height: 24px;
    height: 39px;
    border-top: 1px solid #DDD;
    color: #a3a3a3;

    i {
        cursor: pointer;
    }

    label {
        display: inline-block;
        margin: 0 10px;
    }
}  
</style>