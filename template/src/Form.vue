<template>
<div class="test-form">
<post-form :params="{open: false}">
    <div class="line">
        <label>标题</label>
        <input type="text" v-field="{name: 'title'}" maxlength="32">
        <field-tip :params="{left: 30}"></field-tip>
        <info>
            标题：描述XXX
        </info>
    </div>
    <div class="line">
        <label>描述</label>
        <textarea v-field="{name: 'desc'}"
            id="desc-text"
            maxlength="64"></textarea>
        <field-tip :params="{left: 30, for: 'desc-text'}"></field-tip>
    </div>
    <div class="line">
        <label>预算</label>
        <input type="number" v-field="{name: 'budget'}" max="999" min="10" step="0.1">元
        <field-tip :params="{left: 30}"></field-tip>
    </div>
    <div class="line">
        <label>URL</label>
        <input type="text" 
            v-field="{name: 'url'}"
            maxlength="128">
        <field-tip :params="{left: 30}"></field-tip>
    </div>
    <div class="line">
        <button>确定</button>
    </div>
</post-form>
</div>
</template>

<script type="text/javascript">
import Field from 'smui/directive/field'
import PostForm from 'smui/PostForm'
import Info from 'smui/Info'

// import validator from 'validator/index'
// validator.setSiteUrls('http://e.sm.cn/')

// // 挂载 validator
// Field.check = validator.check

import FieldTip from 'smui/FieldTip'

var params = {
    item: {
        title: '标题',
        desc: '描述',
        url: 'http://e.sm.cn'
    }
}

export default {
    params,
    components: {FieldTip, Info, PostForm},
    methods: {
        change(e) {
            validator.check(e.value)
        }
    }
}

</script>

<style type="text/css" lang="less">
.test-form {
    height: 500px;
    width: 500px;
    margin: 20px auto;

    input,textarea {
        width: 150px;
        line-height: 20px;
    }

    form {
        border: 1px solid #CCC;
        border-radius: 5px;
        padding: 10px;
    }

    form:hover {
        box-shadow: 3px 5px #EEE;
    }

    .line {
        line-height: 30px;
        padding: 5px 10px;
        label {
            width: 5em;
            vertical-align: top;
            display: inline-block;
            vertical-align: top;
        }
    }
}
</style>