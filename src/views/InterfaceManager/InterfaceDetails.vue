<template>
    <el-row class="au-interface-details">
        <el-col :span="24" class="au-col-top">
            <h1>幼儿园微信公众号</h1>
        </el-col>
        <el-col :span="5" class="au-col-left">
            <div id="au-jstree"></div>
        </el-col>
        <el-col :span="19" class="au-col-right">
            <el-form label-position="right" label-width="9rem" v-show="isShow">
                <el-form-item label="输入框:" prop="name">
                    <el-input placeholder="项目名称" :value="testData1"></el-input>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>


<script>
export default {
    name: 'interfaceDetails',
    data(){
        return {
            jstreeData:{
                "data": {
                    "text": '幼儿园项目',
                },
                "check_callback" : true,
            },
            isShow: true,
            testData1: 'default',
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            let _that = this;

            $('#au-jstree').jstree({
                'core': this.jstreeData,
                'contextmenu' : {
                    'items' : function(node) {
                        var tmp = $.jstree.defaults.contextmenu.items();
                        delete tmp.create.action;
                        tmp.create.label = "New";
                        tmp.create.submenu = {
                            "create_folder" : {
                                "separator_after": true,
                                "label": "Folder",
                                "action": function (data) {
                                    var inst = $.jstree.reference(data.reference),
                                        obj = inst.get_node(data.reference);
                                    inst.create_node(obj, { type : "default" }, "last", function (new_node) {
                                        setTimeout(function () { inst.edit(new_node); },0);
                                    });
                                }
                            },
                            "create_file" : {
                                "label": "File",
                                "action": function (data) {
                                    var inst = $.jstree.reference(data.reference),
                                        obj = inst.get_node(data.reference);
                                    inst.create_node(obj, { type : "file" }, "last", function (new_node) {
                                        setTimeout(function () { inst.edit(new_node); },0);
                                    });
                                }
                            }
                        };
                        if(this.get_type(node) === "file") {
                            delete tmp.create;
                        }
                        if(node.id === "j1_1") {
                            delete tmp.remove;
                        }

                        delete tmp.ccp;
                        return tmp;
                    }
                },
                'types' : {
                    "default" : {"icon": 'fa fa-folder-open-o'},
                    "file" : {"icon" : "fa fa-file-text-o"}
                },
                'plugins' : ['dnd','sort','types','contextmenu']
            }).on('delete_node.jstree', function (e, data) {
                console.log("delete_e" + e)
                console.log("delete_data" + data)
                /**$.get('?operation=delete_node', { 'id' : data.node.id })
                    .fail(function () {
                        data.instance.refresh();
                });*/
            }).on('create_node.jstree', function (e, data) {
                console.log("create_e" + e)
                console.log("create_data" + data)
                /**$.get('?operation=create_node', { 'type' : data.node.type, 'id' : data.node.parent, 'text' : data.node.text })
                    .done(function (d) {
                        data.instance.set_id(data.node, d.id);
                    })
                    .fail(function () {
                        data.instance.refresh();
                    });*/
            }).on('rename_node.jstree', function (e, data) {
                console.log("rename_e" + e)
                console.log("rename_data" + data)
                /**$.get('?operation=rename_node', { 'id' : data.node.id, 'text' : data.text })
                    .done(function (d) {
                        data.instance.set_id(data.node, d.id);
                    })
                    .fail(function () {
                        data.instance.refresh();
                    });*/
            }).on('move_node.jstree', function (e, data) {
                console.log("move_node_e" + e)
                console.log("move_node_data" + data)
                /**$.get('?operation=move_node', { 'id' : data.node.id, 'parent' : data.parent })
                    .done(function (d) {
                        //data.instance.load_node(data.parent);
                        data.instance.refresh();
                    })
                    .fail(function () {
                        data.instance.refresh();
                    });*/
            }).on('changed.jstree', function (e, data) {
                console.log(e)
                console.log(data)

                let _node = data.node;
                if (_node.type === 'file') {
                    _that.isShow = true;
                    _that.testData1 = _node.text;
                } else {
                    _that.isShow = false;
                }

            });
        }
    }
}
</script>


<style lang="stylus" scoped>
    .au-col-top
        height 5rem
    .au-col-left
        overflow hidden
        border 0.1rem solid #CCC
        height calc(100vh - 18rem)
    .au-col-right
        border 0.1rem solid #CCC
        height calc(100vh - 18rem)
</style>
