<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220619210650 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE module_permission (module_id INT NOT NULL, permission_id INT NOT NULL, INDEX IDX_75ACB937AFC2B591 (module_id), INDEX IDX_75ACB937FED90CCA (permission_id), PRIMARY KEY(module_id, permission_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE module_permission ADD CONSTRAINT FK_75ACB937AFC2B591 FOREIGN KEY (module_id) REFERENCES module (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE module_permission ADD CONSTRAINT FK_75ACB937FED90CCA FOREIGN KEY (permission_id) REFERENCES permission (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE permission DROP FOREIGN KEY FK_E04992AAAFC2B591');
        $this->addSql('DROP INDEX IDX_E04992AAAFC2B591 ON permission');
        $this->addSql('ALTER TABLE permission DROP module_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE module_permission');
        $this->addSql('ALTER TABLE permission ADD module_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE permission ADD CONSTRAINT FK_E04992AAAFC2B591 FOREIGN KEY (module_id) REFERENCES module (id)');
        $this->addSql('CREATE INDEX IDX_E04992AAAFC2B591 ON permission (module_id)');
    }
}
