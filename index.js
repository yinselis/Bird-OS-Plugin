import { extension_settings } from '../../../extensions.js';

// 初始化函数，酒馆启动时会运行这个
jQuery(async () => {
    // 1. 在酒馆顶部菜单加个按钮
    const buttonHtml = `
        <div id="bird-os-btn" class="menu_button" title="打开鸟OS">
            <i class="fa-solid fa-heart" style="color: #ff80ab;"></i>
            <span class="m-w-0">鸟OS</span>
        </div>
    `;
    $('#extensions_menu').prepend(buttonHtml);

    // 2. 给按钮绑定点击事件
    $('#bird-os-btn').on('click', function () {
        // 如果已经打开了，就关掉
        if ($('#bird-os-popup').length > 0) {
            $('#bird-os-popup').remove();
            return;
        }

        // 弹出一个好看的窗口，里面装你的 HTML
        // 注意这里的 src 路径，酒馆会自动映射
        const popupHtml = `
            <div id="bird-os-popup" style="position:fixed; top:50px; right:50px; width:390px; height:800px; z-index:9999; border-radius:30px; box-shadow:0 20px 50px rgba(0,0,0,0.3); overflow:hidden; border: 8px solid #333;">
                <div style="background:#333; height:30px; display:flex; justify-content:flex-end; padding-right:15px; align-items:center;">
                    <button id="bird-os-close" style="background:#ff3b30; border:none; width:12px; height:12px; border-radius:50%; cursor:pointer;"></button>
                </div>
                <iframe src="/scripts/extensions/third-party/Bird-OS-Plugin/index.html" style="width:100%; height:calc(100% - 30px); border:none;"></iframe>
            </div>
        `;
        $('body').append(popupHtml);

        // 绑定关闭按钮
        $('#bird-os-close').on('click', () => $('#bird-os-popup').remove());
    });
});