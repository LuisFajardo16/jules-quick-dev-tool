import { Button } from '../components/Button.js';
import { Input } from '../components/Input.js';
import { Alert } from '../components/Alert.js';
import { Dropdown } from '../components/Dropdown.js';

export const renderComponentsPreview = () => `
  <div class="max-w-4xl mx-auto pb-12">
    <h2 class="text-3xl font-bold mb-8 border-b pb-4">UI Components Preview</h2>

    <section class="mb-10">
      <h3 class="text-xl font-semibold mb-4 text-base-content/80">Buttons</h3>
      <div class="flex flex-wrap gap-4">
        ${Button({ text: 'Primary', variant: 'primary' })}
        ${Button({ text: 'Secondary', variant: 'secondary' })}
        ${Button({ text: 'Accent', variant: 'accent' })}
        ${Button({ text: 'Ghost', variant: 'ghost' })}
        ${Button({ text: 'Error', variant: 'error' })}
        ${Button({ text: 'Success', variant: 'success' })}
        ${Button({ text: 'Outline', variant: 'outline' })}
      </div>
    </section>

    <section class="mb-10">
      <h3 class="text-xl font-semibold mb-4 text-base-content/80">Inputs</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${Input({ placeholder: 'Simple input...', id: 'test_input1' })}
        ${Input({ label: 'With Label', placeholder: 'Type here...', id: 'test_input2' })}
      </div>
    </section>

    <section class="mb-10">
      <h3 class="text-xl font-semibold mb-4 text-base-content/80">Alerts</h3>
      <div class="flex flex-col gap-2">
        ${Alert({ type: 'info', message: 'This is an information alert.' })}
        ${Alert({ type: 'success', message: 'Operation completed successfully!' })}
        ${Alert({ type: 'warning', message: 'Warning: Check your inputs.' })}
        ${Alert({ type: 'error', message: 'Error: Something went wrong.' })}
      </div>
    </section>

    <section class="mb-10">
      <h3 class="text-xl font-semibold mb-4 text-base-content/80">Dropdowns</h3>
      <div class="flex gap-4">
        ${Dropdown({
          label: 'Options',
          items: [
            { id: '1', label: 'Item 1' },
            { id: '2', label: 'Item 2' }
          ]
        })}
      </div>
    </section>

    <section class="mb-10">
      <h3 class="text-xl font-semibold mb-4 text-base-content/80">Modals</h3>
      <div>
        <button class="btn btn-primary" onclick="document.getElementById('demo_modal').showModal()">Open Demo Modal</button>
        <dialog id="demo_modal" class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">Press ESC key or click the button below to close</p>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </section>
  </div>
`;
