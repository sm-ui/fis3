<template>
<div class="dialog-panel-demo">
    <dialog-panel v-ref:dialog>
        <div slot="title">表头</div>
        <div slot="content">
            <form-panel></form-panel>
        </div>
        <div slot="footer">
            <button>确定</button>
        </div>
    </dialog-panel>

    <button @click="showDialog">显示弹窗</button>
</div>
</template>
<script type="text/javascript">
import Dialog from 'smui/Dialog'
import DialogPanel from 'smui/DialogPanel'
import FormPanel from './Form.vue'

export default {
    methods: {
        showDialog() {
            this.$refs.dialog.showModal({
                width: 600,
                height: 350
            })
        }
    },
    components: {DialogPanel, FormPanel}
}
</script>

<style type="text/css" lang="less">
.dialog-panel-demo {
    width: 500px;
    height: 500px;
}
</style>