<template>
<div class="message-panel">
    <div>
        <h2>提示框</h2>
        <button @click="dialog.alert('alert')">alert</button>
        <button @click="dialog.confirm('alert')">confirm</button>
        <button @click="dialog.prompt('alert')">prompt</button>
        <button @click="dialog.toast('alert')">toast</button>
        <button @click="dialog.popup({title: 'title', message: 'message'})">popup</button>
        <button @click="dialog.loading()">loading</button>
    </div>

    <div>
        <info>
            信息提示
        </info>
    </div>
</div>
</template>

<script type="text/javascript">

import Dialog from 'smui/Dialog'
import Info from 'smui/Info'

let {InlineDialog, Toast} = Dialog

export default {
    data() {
        return {
            dialog: Dialog
        }
    },
    components: {
        InlineDialog, Toast, Info
    }
}

</script>

<style type="text/css" lang="less">
.message-panel {

}

</style>