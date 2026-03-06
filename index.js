import { extension_settings } from '../../../extensions.js';

jQuery(async () => {
    // 1. 生成一个好看的手机图标按钮
    const buttonHtml = `
        <div id="bird-os-btn" class="menu_button" title="打开鸟OS">
            <i class="fa-solid fa-mobile-screen" style="color: #ff80ab; font-size: 20px;"></i>
        </div>
    `;
    
    // 2. 把它强行插在顶部导航栏的右侧（拼图图标的旁边）
    $('#rm_button_group_top').prepend(buttonHtml);

    // 3. 点击按钮，弹出你的手机界面
    $('#bird-os-btn').on('click', function () {
        if ($('#bird-os-popup').length > 0) {
            $('#bird-os-popup').remove();
            return;
        }

        // 手机端完美适配的弹窗
        const popupHtml = `
            <div id="bird-os-popup" style="position:fixed; top:5%; left:50%; transform:translateX(-50%); width:95%; max-width:400px; height:85%; z-index:9999; border-radius:30px; box-shadow:0 20px 50px rgba(0,0,0,0.5); overflow:hidden; border: 6px solid #333; background: #fff;">
                <div style="background:#333; height:30px; display:flex; justify-content:flex-end; padding-right:15px; align-items:center;">
                    <button id="bird-os-close" style="background:#ff3b30; border:none; width:14px; height:14px; border-radius:50%; cursor:pointer;"></button>
                </div>
                <!-- 这里的路径对应你 GitHub 的仓库名 Bird-OS-Plugin -->
                <iframe src="/scripts/extensions/third-party/Bird-OS-Plugin/index.html" style="width:100%; height:calc(100% - 30px); border:none;"></iframe>
            </div>
        `;
        $('body').append(popupHtml);

        // 绑定关闭按钮
        $('#bird-os-close').on('click', () => $('#bird-os-popup').remove());
    });
});
