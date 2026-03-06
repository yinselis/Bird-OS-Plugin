import { extension_settings } from '../../../extensions.js';
import { saveSettingsDebounced } from '../../../../script.js';

// ⚠️重要：这里的名字必须和你的 GitHub 仓库名一模一样！
const extensionName = "Bird-OS-Plugin"; 
const extensionFolderPath = `/scripts/extensions/third-party/${extensionName}`;

jQuery(async () => {
    // 1. 初始化设置（记住你是否开启了悬浮球）
    if (!extension_settings[extensionName]) {
        extension_settings[extensionName] = { showFloating: true };
    }

    // 2. 在你截图的那个“扩展面板”里，画一个专属的控制台
    const settingsHtml = `
        <div class="list-group-item" style="border: 1px solid var(--SmartThemeBorderColor); border-radius: 10px; padding: 10px; margin-bottom: 10px; background: rgba(255, 128, 171, 0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="font-weight: bold; color: #ff80ab; font-size: 16px;">
                    <i class="fa-solid fa-mobile-screen" style="margin-right: 5px;"></i> 鸟OS 陪伴系统
                </div>
                <div id="bird-os-open-btn" class="menu_button" style="margin: 0; padding: 5px 15px; background: #ff80ab; color: white; border-radius: 5px;">
                    打开系统
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <label for="bird-os-floating-toggle" style="margin: 0;">显示桌面悬浮球</label>
                <input type="checkbox" id="bird-os-floating-toggle" ${extension_settings[extensionName].showFloating ? 'checked' : ''}>
            </div>
        </div>
    `;
    
    // 把控制台塞进扩展列表的最上面
    $('#extensions_settings').prepend(settingsHtml);

    // 3. 画一个屏幕右下角的悬浮球
    const floatingBtnHtml = `
        <div id="bird-os-floating-btn" style="position: fixed; bottom: 80px; right: 20px; width: 50px; height: 50px; background: #ff80ab; border-radius: 50%; display: ${extension_settings[extensionName].showFloating ? 'flex' : 'none'}; justify-content: center; align-items: center; box-shadow: 0 4px 15px rgba(255,128,171,0.5); z-index: 9999; cursor: pointer;">
            <i class="fa-solid fa-mobile-screen" style="color: white; font-size: 24px;"></i>
        </div>
    `;
    $('body').append(floatingBtnHtml);

    // 4. 定义打开手机界面的功能
    function openBirdOS() {
        if ($('#bird-os-popup').length > 0) return; // 如果已经打开了就不管

        const popupHtml = `
            <div id="bird-os-popup" style="position:fixed; top:5%; left:50%; transform:translateX(-50%); width:95%; max-width:400px; height:85%; z-index:99999; border-radius:30px; box-shadow:0 20px 50px rgba(0,0,0,0.5); overflow:hidden; border: 6px solid #333; background: #fff;">
                <div style="background:#333; height:30px; display:flex; justify-content:flex-end; padding-right:15px; align-items:center;">
                    <button id="bird-os-close" style="background:#ff3b30; border:none; width:14px; height:14px; border-radius:50%; cursor:pointer;"></button>
                </div>
                <iframe src="${extensionFolderPath}/index.html" style="width:100%; height:calc(100% - 30px); border:none;"></iframe>
            </div>
        `;
        $('body').append(popupHtml);
        $('#bird-os-close').on('click', () => $('#bird-os-popup').remove());
    }

    // 5. 绑定按钮点击事件
    $('#bird-os-open-btn').on('click', openBirdOS);
    $('#bird-os-floating-btn').on('click', openBirdOS);

    // 6. 绑定开关事件（控制悬浮球显示/隐藏，并保存设置）
    $('#bird-os-floating-toggle').on('change', function() {
        const isChecked = $(this).is(':checked');
        extension_settings[extensionName].showFloating = isChecked;
        saveSettingsDebounced(); // 告诉酒馆保存设置
        
        if (isChecked) {
            $('#bird-os-floating-btn').css('display', 'flex');
        } else {
            $('#bird-os-floating-btn').css('display', 'none');
        }
    });
});
