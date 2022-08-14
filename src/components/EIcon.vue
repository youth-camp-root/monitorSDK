<template>
    <el-icon :size="size" :color="color">
        <component :is="name" />
    </el-icon>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import {User, Tickets, Setting, ChatRound} from "@element-plus/icons";
    export default defineComponent({
        components: {User, Tickets, Setting, ChatRound},
        name: "EIcon",
        props: {
            name: {
                type: String,
                required: true,
            },
            size: {
                type: String,
                default: "",
            },
            color: {
                type: String,
                default: "",
            },
        },
    });
</script>
