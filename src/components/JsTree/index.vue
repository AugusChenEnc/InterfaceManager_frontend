<template>
    <div id="au-jstree"></div>
</template>


<script>
export default {
    name: 'jstree',
    data() {
        return {
            jstreeData:{
                "data": {
                    "id": "ssss_root",
                    "text": "幼儿园项目222",
                    "children": [{
                        "id": "xxxxfile",
                        "text": "login",
                        "type": "file",
                        "icon": "fa fa-share"
                    }]
                },
                "check_callback" : true,
            }
        }
    },
    mounted(){
        this.init();
    },
    methods: {
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
                        console.log(node.id);
                        if((node.id).indexOf("root") != -1) {
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
                let _isShow = false;
                let _showData = "";

                if (_node.type === 'file') {
                    _isShow = true;
                    _showData = _node.text;
                } 

                _that.$emit('rightIsShowAndData', '{ "isShow": ' + _isShow + ', "data": "' + _showData + '"}');
            });
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
