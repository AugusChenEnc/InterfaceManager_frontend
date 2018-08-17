<template>
    <div id="au-jstree"></div>
</template>


<script>
import { fetchGet, fetchPost, fetchPut, fetchDelete } from '@/utils/api'

export default {
    name: 'jstree',
    data() {
        return {
            jstreeData:{
                "data": {},
                "check_callback" : true,
            },
            treeStructure: {
                "id": '',
                "text": 'New node',
                "type": 'default',
                "icon": 'fa fa-folder-open-o',
                "parentId": ''
            }
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        init(){
            let _that = this;

            //load Data
            fetchGet({
                url: '/interfaceTree/'+ this.$route.params.projectId +'/getTree'
            }).then(response => {
                if (response.meta.statusCode == 200) {
                    _that.jstreeData.data = response.data;
                }

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
                    fetchDelete({
                        url: '/interfaceTree/'+ data.node.id +'/deleteTreeStructure',
                    }).then(response => {
                        console.log(response);
                    }).catch(error => {
                        console.log(error);
                        //data.instance.refresh();
                    });
                }).on('create_node.jstree', function (e, data) {
                    _that.treeStructure.id = data.node.id;
                    _that.treeStructure.text = data.node.text;
                    _that.treeStructure.type = data.node.type;
                    _that.treeStructure.icon = data.node.icon;
                    _that.treeStructure.parentId = data.parent;

                    fetchPost({
                        url: '/interfaceTree/addTreeStructure',
                        params: _that.treeStructure
                    }).then(response => {
                        console.log(response);
                    }).catch(error => {
                        console.log(error);
                        //data.instance.refresh();
                    });
                }).on('rename_node.jstree', function (e, data) {
                    
                    console.log(data);
                    _that.treeStructure.id = data.node.id;
                    _that.treeStructure.text = data.node.text;

                    fetchPut({
                        url: '/interfaceTree/amendTreeStructure',
                        params: _that.treeStructure
                    }).then(response => {
                        console.log(response);
                    }).catch(error => {
                        console.log(error);
                        //data.instance.refresh();
                    });
                }).on('move_node.jstree', function (e, data) {
                    //这个是用来拖动的，先不处理
                    console.log("move_node_e" + e)
                    console.log("move_node_data" + data)

                }).on('changed.jstree', function (e, data) {
                    let _node = data.node;
                    let _isShow = false;
                    let _showData = "";

                    if (_node.type === 'file') {
                        _isShow = true;
                        _showData = _node.text;
                    } 

                    _that.$emit('rightIsShowAndData', '{ "isShow": ' + _isShow + ', "data": "' + _showData + '"}');
                });
            }).catch(error => {
                console.log(error)
            });

        },

    }
}
</script>

<style lang="stylus" scoped>

</style>
