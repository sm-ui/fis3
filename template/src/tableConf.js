import Dialog from 'smui/Dialog'

module.exports = {
    fields: ['title', 'author', 'visitor'],
    headPlugin (value) {
        return `<i class="sm-order"></i>`
    },
    headTextMap: {
        title: '标题',
        author: '作者',
        visitor: '访问人数'
    },
    cellTextMap: {
        title (value) {
            return `${value}<i class="sm-edit" data-action="editTitle"></i>`
        },
        author (value) {
            return `${value}<i class="sm-edit" data-action="editAuthor"></i>`
        }
    },
    action: {
        editTitle(e) {
            Dialog.prompt('修改标题', (v) => {e.data.title = v})
        },
        editAuthor(e) {
            Dialog.prompt('修改作者', (v) => {e.data.author = v})
        },
        sortTitle (e) {
            Dialog.alert('排序操作')
        }
    }
}